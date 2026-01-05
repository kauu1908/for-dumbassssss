
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartParticlesComponent } from './components/heart-particles.component';
import { GeminiService } from './services/gemini.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeartParticlesComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  // Navigation through the narrative
  currentStep = signal(0);
  totalSteps = 5;
  
  // AI Generated Poem State
  aiPoem = signal<string>('');
  isGenerating = signal(false);

  constructor(private gemini: GeminiService) {}

  nextStep() {
    if (this.currentStep() < this.totalSteps - 1) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep() {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  async generateHealingWords() {
    if (this.isGenerating()) return;
    
    this.isGenerating.set(true);
    try {
      const response = await this.gemini.generateApologyPoem("Antar");
      this.aiPoem.set(response);
    } catch (err) {
      console.error(err);
      this.aiPoem.set("My love for you transcends words, and I hope this small gesture shows you how much you mean to me.");
    } finally {
      this.isGenerating.set(false);
    }
  }
}
