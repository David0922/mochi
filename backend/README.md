### setup proj

add to vscode `settings.json`

```json
"gopls": {
  "experimentalWorkspaceModule": true,
}
```

to create a new golang module outside of `$GOPATH`

```bash
go mod init mochi-backend
```

generate / sync `go.sum`

```bash
go mod tidy
```

build binary

```bash
go build
```

### build docker image

```
docker build -t mochi-backend .
```

### run docker container

```
docker run --rm -it -p 3000:3000 mochi-backend
```

### verify that it works

```
curl localhost:3000
```
