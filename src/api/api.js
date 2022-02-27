export const Api = {
  url: "http://localhost:8000/list/",
  buildGetRequest: () => {
    return fetch(Api.url);
  },
  buildGetPriorityRequest: (priority) => {
    return fetch(Api.url + "findbypriority/" + priority);
  },
  buildGetRequestById: (id) => {
    return fetch(Api.url + "findbyid/" + id);
  },
  buildPostRequest: (body) => {
    return fetch(Api.url + "add", {
      method: "POST",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body),
    });
  },
  buildPutRequest: (body, id) => {
    return fetch(Api.url + "update/" + id, {
      method: "PUT",
      headers: new Headers({
        "Content-type": "application/json",
      }),
      body: JSON.stringify(body, id),
    });
  },
  buildDeleteRequest: (id) => {
    return fetch(Api.url + "delete/" + id, {
      method: "DELETE",
    });
  },
};
