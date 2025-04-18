/**
jangan hapus wm bang😂😭🤫🙄🥱
Code by Tio
anichin router
script rest api simpel bisa pm (bisa demo api)
wa.me/6282285367346
**/

import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

router.get("/api/anichin", async (req, res) => {
  const { type, query } = req.query;
  if (!type) {
    return res.status(400).json({
      error: "Parameter 'type' wajib diisi."
    });
  }

  try {
    let result;

    switch (type.toLowerCase()) {
      case "latest":
        result = await Anichin.Latest();
        break;
      case "detail":
        if (!query) return res.status(400).json({ error: "Parameter 'query' diperlukan untuk 'detail'." });
        result = await Anichin.Detail(query);
        break;
      case "episode":
        if (!query) return res.status(400).json({ error: "Parameter 'query' diperlukan untuk 'episode'." });
        result = await Anichin.Episode(query);
        break;
      case "download":
        if (!query) return res.status(400).json({ error: "Parameter 'query' diperlukan untuk 'download'." });
        result = await Anichin.Download(query);
        break;
      case "search":
        if (!query) return res.status(400).json({ error: "Parameter 'query' diperlukan untuk 'search'." });
        result = await Anichin.Search(query);
        break;
      case "popular":
        result = await Anichin.Popular();
        break;
      default:
        return res.status(400).json({
          error: "⚠️ *Tipe tidak dikenal.*",
          message: "Pilih salah satu dari: `latest`, `detail`, `episode`, `download`, `search`, `popular`."
        });
    }

    res.json({ status: true, type, result });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: "Gagal memproses permintaan.",
      message: error.message
    });
  }
});

// Metadata API Router
const data = router.stack[0]?.route;
router.methods = "GET";
router.tags = ["anime"];
router.description = "Scraper data anime dari Anichin: latest, detail, episode, download, search, popular";
router.path = data?.path;
router.params = [
  { name: "type", type: "string", required: true, description: "Tipe endpoint: latest, detail, episode, download, search, popular" },
  { name: "query", type: "string", required: false, description: "Data tambahan untuk tipe tertentu (misal: url atau keyword)" }
];

export default router;
