import { Keyword } from "../../models/index.js";

class KeywordSeeder {
  static async seed() {
    const keywordData = [
      {
        id: "1",
        name: "garden",
        searchCount: 0,
      },
      {
        id: "3",
        name: "launch",
        searchCount: 50,
      },
    ];

    for (const singleKeywordData of keywordData) {
      const currentKeyword = await Keyword.query().findOne(singleKeywordData);
      if (!currentKeyword) {
        await Keyword.query().insert(singleKeywordData);
      }
    }
  }
}

export default KeywordSeeder;
