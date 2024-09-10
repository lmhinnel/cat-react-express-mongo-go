FROM golang:1.22.1 AS builder

ENV CGO_ENABLED 0
ENV GOPATH /go
ENV GOCACHE /go-build

WORKDIR /usr/app

COPY go.mod go.sum ./
RUN http_proxy=http://10.61.11.42:3128 https_proxy=http://10.61.11.42:3128 no_proxy=localhost,127.0.0.0/8,::1 go mod download

# RUN go mod download
# RUN curl -sSfL https://raw.githubusercontent.com/air-verse/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

COPY *.go ./

RUN go build -o goApp .

CMD ["./goApp"]

