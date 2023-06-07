import axios, {AxiosResponse} from 'axios';

export class SteamApiService {
    private readonly apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async getAppList(): Promise<any> {
        const appListUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';

        try {
            const response: AxiosResponse = await axios.get(appListUrl);
            if (!response.data) {
                return false;
            }
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            throw error;
        }
    }

    public async getGameById(gameId: number): Promise<any> {
        const gameUrl = this.apiUrl + gameId;

        try {
            const response: AxiosResponse = await axios.get(gameUrl);
            if (response.data[gameId]['success'] === false) {
                return false;
            }
            const responseData = response.data[gameId]['data'];
            return {
                name: responseData.name,
                pc_requirements: responseData.pc_requirements,
                languages: responseData.supported_languages,
                developers: responseData.developers,
                price_overview: responseData.price_overview,
                categories: responseData.categories,
                release_date: responseData.release_date,
            };
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            throw error;
        }
    }
}