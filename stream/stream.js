import { Readable, Writable, Transform } from "node:stream";

class oneToHundredStream extends Readable {
  init = 1;

  _read() {
    const i = this.init++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback();
  }
}

new oneToHundredStream().pipe(new MultiplyByTenStream());
