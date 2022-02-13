export const endpoint = {
  "baseOrg":"http://localhost:3000/",
  "org":"",
  "redash":"",
  "freshdesk":"",
  "pipedrive":"",
}

export const urls = {
  "listOrg":endpoint["baseOrg"]+"api/organizations/",
  "getTickets":endpoint["baseOrg"]+"api/freshdesk?name=",
  "getTrans":endpoint["baseOrg"]+"api/redash/",
  "searchOrg":endpoint["baseOrg"]+"api/search/organizations?name="
}