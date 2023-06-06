import axios, {AxiosResponse} from 'axios';

export class SteamApiService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async getGameById(gameId: number): Promise<any> {
        const gameUrl = `https://store.steampowered.com/api/appdetails?appids=${gameId}`;

        try {
            const response: AxiosResponse = await axios.get(gameUrl);
            const responseData = response.data[gameId]['data']
            //
            const selectedData = {
                name: responseData.name,
            };
            return selectedData;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            throw error;
        }
    }
}