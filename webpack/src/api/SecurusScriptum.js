const baseUrl = "http://localhost:8080/";

export default class SecurusScriptum {
  handleDeleteRequest(subUrl) {
    let xhttp = new XMLHttpRequest();
    return new Promise( function(resolve, reject) {
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
          resolve(JSON.parse(this.responseText))
        } else if  (this.readyState == 4 && (this.status >= 400 && this.status < 500)) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && (this.status >= 500 && this.status < 600 )) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4) {
          reject(JSON.parse(this.responseText))
        }
      }
      xhttp.withCredentials = true;
      xhttp.open("DELETE", baseUrl + subUrl, true)
      xhttp.send()
    })
  }

  handlePutRequest(subUrl, data) {
    let xhttp = new XMLHttpRequest();
    return new Promise( function(resolve, reject) {
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
          resolve(JSON.parse(this.responseText))
        } else if  (this.readyState == 4 && (this.status >= 400 && this.status < 500)) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && (this.status >= 500 && this.status < 600 )) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4) {
          reject(JSON.parse(this.responseText))
        }
      }
      xhttp.withCredentials = true;
      xhttp.open("PUT", baseUrl + subUrl, true)
      xhttp.send(JSON.stringify(data))
    })
  }

  handlePostRequest(subUrl, data) {
    let xhttp = new XMLHttpRequest();
    return new Promise( function(resolve, reject) {
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
          resolve(JSON.parse(this.responseText))
        } else if  (this.readyState == 4 && (this.status >= 400 && this.status < 500)) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && (this.status >= 500 && this.status < 600 )) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4) {
          reject(JSON.parse(this.responseText))
        }
      }
      xhttp.withCredentials = true;
      xhttp.open("POST", baseUrl + subUrl, true)
      xhttp.send(JSON.stringify(data))
    })
  }

  handleGetRequest(subUrl) {
    let xhttp = new XMLHttpRequest();
    return new Promise( function(resolve, reject) {
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status >= 200 && this.status < 300)) {
          resolve(JSON.parse(this.responseText))
        } else if  (this.readyState == 4 && (this.status >= 400 && this.status < 500)) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4 && (this.status >= 500 && this.status < 600 )) {
          reject(JSON.parse(this.responseText))
        } else if (this.readyState == 4) {
          reject(JSON.parse(this.responseText))
        }
      }
      xhttp.withCredentials = true;
      xhttp.open("GET", baseUrl + subUrl, true)
      xhttp.send()
    })
  }

  constructor() {
  }
}
