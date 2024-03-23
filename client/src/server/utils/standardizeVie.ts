import unidecode from "unidecode";


function getVieString(text:string){
	return unidecode(text).toLowerCase().replace(/\s+/g, '-')
}

export default getVieString;