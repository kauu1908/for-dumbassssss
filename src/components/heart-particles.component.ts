
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
}

@Component({
  selector: 'app-heart-particles',
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      @for (p of particles(); track p.id) {
        <div 
          class="absolute animate-float text-rose-300"
          [style.left]="p.left"
          [style.bottom]="'-100px'"
          [style.animation-delay]="p.delay"
          [style.animation-duration]="p.duration"
          [style.font-size]="p.size"
          [style.opacity]="p.opacity"
        >
          ❤
        </div>
      }
      
      <!-- Gradient Soft Glows -->
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-[100px]"></div>
    </div>
  `,
  host: {
    'class': 'contents'
  }
})
export class HeartParticlesComponent {
  particles = signal<Particle[]>(this.generateParticles(25));

  private generateParticles(count: number): Particle[] {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${10 + Math.random() * 20}s`,
      size: `${10 + Math.random() * 30}px`,
      opacity: 0.1 + Math.random() * 0.4
    }));
  }
}
