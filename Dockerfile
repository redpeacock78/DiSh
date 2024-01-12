FROM over/bun:latest

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN bun build --compile src/main.ts --outfile build/main

CMD ./build/main