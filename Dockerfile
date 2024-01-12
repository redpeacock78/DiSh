FROM over/bun:1

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN bun build --compile src/main.ts --outfile build/main

CMD ./build/main