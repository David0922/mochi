setup

```bash
yarn
```

run locally

```bash
yarn build
yarn start
```

containerize

```bash
docker build -t weekly-planner-frontend .
docker run --rm -it -p 8080:80 weekly-planner-frontend
```
