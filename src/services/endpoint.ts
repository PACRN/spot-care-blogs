import { Config } from "@/constants/config";


export const Endpoint = {

  get: async (path: string, params: any = undefined, version: string = "V1") => {
    try {
      var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
      var url = new URL(`${basePath}${path}`);

      if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching:', error);
    }
  },
  post: async (path: string, body: any, stringfy: boolean = false) => {
    try {
      const response = await fetch(`${Config.URL.API_URL}${path}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: stringfy ? JSON.stringify(body) : body,
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching :', error);
    }
  },
  postFormData: async (path: string, body: any) => {
    try {
      const response = await fetch(`${Config.URL.API_URL}${path}`, {
        method: 'POST',
        body: body,
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching :', error);
    }
  },
  getIpdDetails: async () => {
    try {
      var url = new URL(Config.URL.IP_URL)
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json()
    } catch (error) {
      console.error('Error fetching :', error);
    }
  }
} 