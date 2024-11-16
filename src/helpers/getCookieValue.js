

export default function GetCookieValue(request){

  const token = request.cookies.get("token")?.value || ""; // "token" is the cookie key
  return token;

}