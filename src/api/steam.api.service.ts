import axios, {AxiosResponse} from 'axios';

export class SteamApiService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async getGameById(gameId: number): Promise<any> {
        const gameUrl = this.apiUrl + gameId;

        try {
            const response: AxiosResponse = await axios.get(gameUrl);
            if (response.data[gameId]['success'] === false) {
                return false;
            }
            const responseData = response.data[gameId]['data'];
            const selectedData = {
                name: responseData.name,
                pc_requirements: responseData.pc_requirements,
                languages: responseData.supported_languages
            };
            return selectedData;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            throw error;
        }
    }
}