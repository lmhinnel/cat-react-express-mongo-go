FROM golang:1.18 AS builder

ENV CGO_ENABLED 0
ENV GOPATH /go
ENV GOCACHE /go-build

WORKDIR /usr/app

COPY . .

# RUN http_proxy=http://10.61.11.42:3128 https_proxy=http://10.61.11.42:3128 no_proxy=localhost,127.0.0.0/8,::1 go mod download

# RUN http_proxy=http://10.61.11.42:3128 https_proxy=http://10.61.11.42:3128 no_proxy=localhost,127.0.0.0/8,::1 go get github.com/cosmtrek/air

RUN go mod download

RUN curl -sSfL https://raw.githubusercontent.com/air-verse/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

CMD ["air"]

# FROM --platform=$BUILDPLATFORM golang:1.18-alpine AS builder

# WORKDIR /code

# ENV CGO_ENABLED 0
# ENV GOPATH /go
# ENV GOCACHE /go-build
# # ENV GOPROXY http://10.61.11.42:3128,direct
# # ENV GOINSECURE proxy.golang.org/*,github.com,github.com/*
# # ENV http_proxy http://10.61.11.42:3128
# # ENV https_proxy http://10.61.11.42:3128

# COPY go.mod go.sum ./

# RUN --mount=type=cache,target=/go/pkg/mod/cache \
#     http_proxy=http://10.61.11.42:3128 https_proxy=http://10.61.11.42:3128 no_proxy=localhost,127.0.0.0/8,::1 go mod download

# COPY . .

# RUN --mount=type=cache,target=/go/pkg/mod/cache \
#     --mount=type=cache,target=/go-build \
#     go build -o bin/backend main.go

# CMD ["/code/bin/backend"]

# FROM builder as dev-envs

# RUN <<EOF
# export http_proxy=http://10.61.11.42:3128
# export https_proxy=http://10.61.11.42:3128
# export GOPROXY=http://10.61.11.42:3128
# EOF

# RUN <<EOF
# apk update
# apk add git
# EOF

# RUN <<EOF
# addgroup -S docker
# adduser -S --shell /bin/bash --ingroup docker vscode
# EOF

# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /

# CMD ["go", "run", "main.go"]

# FROM scratch
# COPY --from=builder /code/bin/backend /usr/local/bin/backend
# CMD ["/usr/local/bin/backend"]