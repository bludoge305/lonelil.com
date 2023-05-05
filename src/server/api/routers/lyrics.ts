/* eslint-disable */
import { z } from "zod";
import axios from "axios";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const neteaseClient = axios.create({
  baseURL: "https://music.163.com/api",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
  },
});

const qqMusicClient = axios.create({
  baseURL: "https://c.y.qq.com",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0",
    referer: "https://y.qq.com/",
  },
});

function filterLyrics(lyrics: string) {
  return (
    lyrics
      .replaceAll("&quot;", `"`)
      .replaceAll("&apos;", "'")
      //dont cancel me pls
      .replaceAll("n***a", "ni" + "gg" + "a")
      .replaceAll("d**n", "damn")
      .replaceAll("d**g", "drug")
  );
}

export const lyricsRouter = createTRPCRouter({
  netease: publicProcedure
    .input(z.object({ song: z.string(), artist: z.string() }))
    .mutation(async ({ input }) => {
      const { data: songs } = await neteaseClient.get(
        `/search/get/?csrf_token=hlpretag=&hlposttag=&s=${`${input.song} ${input.artist}`}&type=1&offset=0&total=true&limit=10`
      );

      const theSong = songs.result.songs.find((song: any) =>
        song.artists
          .map((artist: any) => artist.name.toLowerCase())
          .includes(input.artist.toLowerCase())
      );

      if (!theSong)
        return {
          success: false,
          result: "",
          //chinese: "",
          lyricUser: "",
        };

      const { data: lyrics } = await neteaseClient.get(
        `/song/lyric?os=pc&id=${theSong.id}&lv=-1&kv=-1&tv=-1`
      );

      if (!lyrics.lrc?.lyric)
        return { success: false, result: "", lyricUser: "" };

      return {
        success: true,
        result: filterLyrics(lyrics.lrc?.lyric) || "",
        lyricUser: lyrics.lyricUser?.nickname || "",
        //chinese: lyrics.tlyric?.lyric || "",
      };
    }),
  qqmusic: publicProcedure
    .input(z.object({ song: z.string(), artist: z.string() }))
    .mutation(async ({ input }) => {
      const { data: songs } = await qqMusicClient.get(
        `/splcloud/fcgi-bin/smartbox_new.fcg?key=${`${input.song} ${input.artist}`}&format=json&inCharset=utf8&outCharset=utf8&platform=yqq.json`
      );

      const theSong = songs.data.song.itemlist[0];

      if (!theSong)
        return {
          success: false,
          result: "",
          //chinese: "",
        };

      const { data: lyrics } = await qqMusicClient.get(
        `/lyric/fcgi-bin/fcg_query_lyric_new.fcg?format=json&nobase64=1&songmid=${theSong.mid}`
      );

      if (!lyrics.lyric) return { success: false, result: "" /*chinese: ""*/ };

      return {
        success: true,
        result: filterLyrics(lyrics.lyric) || "",
        // chinese: lyrics.trans || "",
      };
    }),
});
