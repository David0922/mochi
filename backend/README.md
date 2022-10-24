### setup proj

add to vscode `settings.json`

```json
"gopls": {
  "experimentalWorkspaceModule": true,
}
```

to create a new golang module outside of `$GOPATH`

```bash
go mod init weekly-planner-backend
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
docker build -t weekly-planner-backend .
```

### run docker container

```
docker run --rm -it -p 3000:3000 weekly-planner-backend
```

### verify that it works

```
curl localhost:3000
```
