import { SearchMatch } from "../../models/index.js";

class SearchMatchSeeder{
    static async seed(){
        const SearchMatchData = [
            {
                id: '1',
                attractionId: '1',
                keywordId: '1',
            },
            {
                id: '2',
                attractionId: '1',
                keywordId: '3',
            },
            {
                id: '3',
                attractionId: '2',
                keywordId: '2'
            }
        ]

        for(const singleSearchMatchData of SearchMatchData) {
            const currentSearchMatch = await SearchMatch.query().findOne(singleSearchMatchData)
            if(!currentSearchMatch){
                await SearchMatch.query().insert(singleSearchMatchData)
            }
        }
    }
}

export default SearchMatchSeeder