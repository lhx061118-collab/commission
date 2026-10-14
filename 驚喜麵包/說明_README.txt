【🍞 驚喜麵包（Color Sketch Surprise）作品圖片放置處】

此資料夾用於放置「驚喜麵包」委託項目的作品範例圖片。

■ 支援格式：.png / .jpg / .jpeg / .gif
■ 目前已放置預設範例：sample1.png（您可隨時替換或刪除）

■ 如何在網站上展示新作品：
方法一（手動設定）：
1. 將您的圖片檔案（例如 01.png, 02.jpg）複製到本資料夾中。
2. 開啟 gallery.html，在 galleryItems 陣列中新增圖片路徑，例如：
   { "src": "驚喜麵包/01.png", "category": "驚喜麵包" },

方法二（自動更新）：
1. 將您的圖片放入此資料夾中。
2. 在專案根目錄執行指令：
   node update_gallery.mjs
   系統會自動掃描此資料夾並同步更新 gallery.html 中的作品展示列表！
