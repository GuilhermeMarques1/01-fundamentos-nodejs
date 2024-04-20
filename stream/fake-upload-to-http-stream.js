import { Readable } from "node:stream";

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

fetch("http://localhost:3334", {
  method: "POST",
  body: new oneToHundredStream(),
  duplex: "half",
});
