package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func handler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	proxyUrl, _ := url.Parse("http://10.61.11.42:3128")
	myClient := &http.Client{Transport: &http.Transport{Proxy: http.ProxyURL(proxyUrl)}}
	resp, err := myClient.Get("https://api.thecatapi.com/v1/images/search")
	// resp, err := http.Get("https://api.thecatapi.com/v1/images/search")

	if err != nil {
		log.Printf("Request Failed: %s", err)
		return
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Reading body failed: %s", err)
		return
	}
	m := make(map[string]string)
	json.Unmarshal(body[1:len(body)-1], &m)

	w.Write([]byte(m["url"]))
}

func hello(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Fprintf(
		w, `
          ##         .
    ## ## ##        ==
 ## ## ## ## ##    ===
/"""""""""""""""""\___/ ===
{                       /  ===-
\______ O           __/
 \    \         __/
  \____\_______/

	
Hello from Docker!
`,
	)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/api", handler)
	r.Get("/hello", hello)

	fmt.Println("Go backend started!")
	log.Fatal(http.ListenAndServe(":3030", r))
}
