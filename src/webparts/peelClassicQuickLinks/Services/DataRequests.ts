import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, ISPHttpClientOptions } from "@microsoft/sp-http";
import { LinkItem } from "../interfaces/LinkItem";

export const getQuickLinks = async (context: WebPartContext) =>{
    
    const responseUrl = `${context.pageContext.web.absoluteUrl}/_vti_bin/UserProfileService.asmx/GetUserLinks`;
    
    let userData = {
        'accountName': "i:0#.f|membership|" + context.pageContext.user.email,
    },
    spOptions: ISPHttpClientOptions = {
        headers:{
            "Accept": "application/json; odata=verbose", 
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(userData)
    };

    const _data = await context.spHttpClient.post(responseUrl, SPHttpClient.configurations.v1, spOptions);
    if (_data.ok){
        const responseResults = await _data.json();
        return  responseResults.d.map((item: LinkItem) => {
            return{
                ID: item.ID,
                Name: item.Name,
                Url: item.Url,
                Group: item.Group
            };
        });
    }

};