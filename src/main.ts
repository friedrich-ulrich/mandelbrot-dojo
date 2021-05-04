import "./style.css";

interface Cplx {
  re: number;
  im: number;
}

function mult(a: Cplx, b: Cplx): Cplx {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

function add(a: Cplx, b: Cplx): Cplx {
  return {
    re: a.re + b.re,
    im: a.im + b.im,
  };
}

function abs(a: Cplx): number {
  return Math.sqrt(a.re * a.re + a.im * a.im);
}

function mandelbrot(x: number, y: number): number {
  let c = { re: (x - 150) / 100, im: (y - 100) / 100 };
  let z = { re: 0, im: 0 };
  let n = 0;

  while (abs(z) < 100 && n < 50) {
    z = add(mult(z, z), c);
    n++;
  }

  return n;
}

setTimeout(() => {
  const canvas = document.getElementById("c") as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");

  console.log(ctx);
  if (ctx) {
    const img = ctx.createImageData(200, 200);

    for (let x = 0; x < 200; x++) {
      for (let y = 0; y < 200; y++) {
        const n = mandelbrot(x, y);
        img.data[(x + y * img.width) * 4 + 1] = 3 * n;
        img.data[(x + y * img.width) * 4 + 3] = 255;

        console.log(n);
      }
    }

    console.log(img);

    ctx.putImageData(img, 20, 20);
  }
});
