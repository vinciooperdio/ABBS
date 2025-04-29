import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';




const NotFound: React.FC = () => {
  useEffect(() => {
    // Polyfill requestAnimationFrame
    (function() {
      const raf = window.requestAnimationFrame || (window as any).mozRequestAnimationFrame || (window as any).webkitRequestAnimationFrame || (window as any).msRequestAnimationFrame;
      window.requestAnimationFrame = raf.bind(window);
    })();

    // Toaster lever and toast animation
    setTimeout(() => {
      const lever = document.querySelector('.js-toaster_lever') as HTMLElement;
      const toast = document.querySelector('.js-toaster_toast') as HTMLElement;
      if (lever) lever.style.top = '30px';
      if (toast) {
        toast.classList.remove('js-ag-hide');
        toast.classList.add('js-ag-animated', 'js-ag-bounce-in-up');
      }
    }, 800);

    // Smoke animation setup
    const canvas = document.getElementById('canvas-404') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let loading = true;
    canvas.width = 300;
    canvas.height = 210;

    const parts: any[] = [];
    const minSpawnTime = 100;
    let lastTime = Date.now();
    const maxLifeTime = Math.min(6000, (canvas.height / (1.5 * 60) * 1000));
    const emitterX = canvas.width / 2 - 50;
    const emitterY = canvas.height - 160;
    const smokeImage = new Image();
    smokeImage.src = 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png';
    smokeImage.onload = () => {
      loading = false;
      render();
    };

    class Smoke {
        x: number;
        y: number;
        size: number;
        startSize: number;
        endSize: number;
        angle: number;
        startLife: number;
        lifeTime: number;
        velY: number;
        velX: number;
        alpha: number;
        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;
          this.startSize = 60;
          this.endSize = 69;
          this.size = this.startSize;
          this.angle = Math.random() * 359;
          this.startLife = Date.now();
          this.lifeTime = 0;
          this.velY = -1 - Math.random() * 0.5;
          this.velX = (Math.floor(Math.random() * -6 + 3)) / 10;
          this.alpha = 1;
        }
        update() {
          this.lifeTime = Date.now() - this.startLife;
          this.angle += 0.2;
          const lifePerc = (this.lifeTime / maxLifeTime) * 100;
          this.size = this.startSize + (this.endSize - this.startSize) * lifePerc * 0.1;
          this.alpha = Math.max(1 - lifePerc * 0.01, 0);
          this.x += this.velX;
          this.y += this.velY;
        }
    }

    function spawn() {
      if (Date.now() > lastTime + minSpawnTime) {
        lastTime = Date.now();
      }
    }

    function render() {
      if (loading) return;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        if (p.y < 0 || p.lifeTime > maxLifeTime) {
          parts.splice(i, 1);
        } else {
          p.update();
          if (ctx) {
            ctx.save();
            const offsetX = -p.size / 2;
            const offsetY = -p.size / 2;
            ctx.translate(p.x - offsetX, p.y - offsetY);
            ctx.rotate((p.angle * Math.PI) / 180);
            ctx.globalAlpha = p.alpha;
            ctx.drawImage(smokeImage, offsetX, offsetY, p.size, p.size);
            ctx.restore();
          }
        }
      }
      spawn();
      requestAnimationFrame(render);
    }
    
    // Avvia l'animazione
    render();

    return () => {
      // Cleanup se necessario
    };
  }, []);

  return (
    <div className="ag-page-404">
        <div className="ag-page-404__content">
          <p className="ag-page-404__description">Pagina non trovata</p>
          <Link to="/" className="ag-page-404__button">
            Torna alla Home
          </Link>
        </div>
      <div className="ag-toaster-wrap">
        <div className="ag-toaster">
          <div className="ag-toaster_back"></div>
          <div className="ag-toaster_front">
            <div className="js-toaster_lever ag-toaster_lever"></div>
          </div>
          <div className="ag-toaster_toast-handler">
            <div className="js-toaster_toast ag-toaster_toast js-ag-hide"></div>
          </div>
        </div>
        <canvas id="canvas-404" className="ag-canvas-404"></canvas>
        <img className="ag-canvas-404_img" src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/404-error-smoke-from-toaster/images/smoke.png" alt="Smoke" />
        
        
      </div>
    </div>
  );
};

export default NotFound; 