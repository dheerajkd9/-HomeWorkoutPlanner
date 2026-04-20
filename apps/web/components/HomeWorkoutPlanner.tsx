'use client';

import { useState } from 'react';

type Equipment = 'sofa' | 'chair' | 'bed' | 'table' | 'wall' | 'stairs' | 'mat' | 'backpack';
type Goal = 'full-body' | 'pilates' | 'strength' | 'mobility';
type Space = 'tiny' | 'room' | 'walk' | 'outdoor';
type Energy = 'gentle' | 'steady' | 'intense';

type Exercise = {
  name: string;
  detail: string;
  reps: string;
  tag: string;
};

const equipmentOptions: Array<{ id: Equipment; label: string; note: string }> = [
  { id: 'sofa', label: 'Sofa', note: 'Incline push-ups and hip bridges' },
  { id: 'chair', label: 'Chair', note: 'Support for triceps, balance, split squats' },
  { id: 'bed', label: 'Bed', note: 'Gentle core and glute work' },
  { id: 'table', label: 'Table', note: 'Support for rows and plank taps' },
  { id: 'wall', label: 'Wall', note: 'Posture, sits, calf raises' },
  { id: 'stairs', label: 'Stairs', note: 'Step cardio and calf work' },
  { id: 'mat', label: 'Mat', note: 'Pilates and floor comfort' },
  { id: 'backpack', label: 'Backpack', note: 'Easy home resistance' },
];

const goalOptions: Array<{ id: Goal; title: string; description: string }> = [
  { id: 'full-body', title: 'Full body reset', description: 'Balanced plan for legs, core, push and posture.' },
  { id: 'pilates', title: 'Pilates at home', description: 'Low-impact toning for abs, hips and alignment.' },
  { id: 'strength', title: 'Strength without gym', description: 'Use furniture and bodyweight as your setup.' },
  { id: 'mobility', title: 'Mobility and posture', description: 'Loosen neck, back and hips after sitting.' },
];

const spaceOptions: Array<{ id: Space; title: string; description: string }> = [
  { id: 'tiny', title: 'Tiny privacy corner', description: 'About 50 x 50 free space.' },
  { id: 'room', title: 'Half room available', description: 'Enough for a mat and controlled movement.' },
  { id: 'walk', title: 'Can walk 10 steps', description: 'Room for carries, lunges and walking drills.' },
  { id: 'outdoor', title: 'Outdoor track or terrace', description: 'Open walking or intervals outside.' },
];

const energyOptions: Array<{ id: Energy; title: string; cue: string }> = [
  { id: 'gentle', title: 'Gentle start', cue: 'Easy momentum for lazy days.' },
  { id: 'steady', title: 'Steady sweat', cue: 'Moderate challenge, still beginner-friendly.' },
  { id: 'intense', title: 'Push me a bit', cue: 'Higher tempo with safe progressions.' },
];

const toggleSelection = <T,>(items: T[], value: T) => (items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);

function buildWorkoutPlan(goal: Goal, space: Space, energy: Energy, equipment: Equipment[]): Exercise[] {
  const has = (item: Equipment) => equipment.includes(item);

  const warmup: Record<Goal, Exercise> = {
    'full-body': { name: 'March and reach', detail: 'Lift knees, open chest, wake up shoulders.', reps: '90 sec', tag: 'Warm-up' },
    pilates: { name: 'Breathing roll-down', detail: 'Slow spinal roll and rib control.', reps: '6 reps', tag: 'Warm-up' },
    strength: { name: 'Squat to arm sweep', detail: 'Groove hips and shoulders before loading.', reps: '75 sec', tag: 'Warm-up' },
    mobility: { name: 'Neck, cat-cow and hip circles', detail: 'Release desk stiffness and low-back tightness.', reps: '2 rounds', tag: 'Warm-up' },
  };

  const coreMap: Record<Goal, Exercise[]> = {
    'full-body': [
      { name: has('chair') ? 'Chair sit-to-stand squat' : 'Tempo bodyweight squat', detail: 'Drive through heels and keep chest proud.', reps: energy === 'gentle' ? '2 x 10' : '3 x 12', tag: 'Legs' },
      { name: has('sofa') ? 'Sofa incline push-up' : 'Wall push-up', detail: 'Press through palms, ribs tucked.', reps: energy === 'intense' ? '3 x 12' : '2 x 10', tag: 'Arms + chest' },
      { name: has('mat') ? 'Dead bug hold' : 'Standing cross-body crunch', detail: 'Brace abs without neck strain.', reps: '3 x 30 sec', tag: 'Core' },
      { name: space === 'walk' || space === 'outdoor' ? 'Walking reverse lunge' : 'Split squat hold', detail: 'Great for glutes without needing machines.', reps: '2 x 8 each side', tag: 'Glutes' },
    ],
    pilates: [
      { name: 'Pelvic curl bridge', detail: 'Articulate the spine and squeeze glutes.', reps: '3 x 10', tag: 'Glutes' },
      { name: 'Single-leg toe taps', detail: 'Slow abs work with lower-back control.', reps: '3 x 12', tag: 'Abs' },
      { name: 'Side-lying inner thigh lift', detail: 'Classic home pilates leg burner.', reps: '2 x 14 each side', tag: 'Legs' },
      { name: 'Swimming pulses', detail: 'Wake up the back body and shoulders.', reps: '3 x 25 sec', tag: 'Back body' },
    ],
    strength: [
      { name: has('backpack') ? 'Backpack front squat' : 'Pause squat', detail: 'Use books or bottles for resistance.', reps: '4 x 8', tag: 'Legs' },
      { name: has('chair') ? 'Chair tricep dip' : 'Close-grip wall push-up', detail: 'Control the lowering phase.', reps: energy === 'gentle' ? '2 x 8' : '3 x 10', tag: 'Arms' },
      { name: has('table') ? 'Table edge row' : 'Backpack row', detail: 'Build upper-back strength for posture.', reps: '3 x 10', tag: 'Back' },
      { name: 'Plank shoulder tap', detail: 'Anti-rotation core strength without equipment.', reps: '3 x 20 taps', tag: 'Core' },
    ],
    mobility: [
      { name: has('wall') ? 'Wall angels' : 'Standing shoulder glide', detail: 'Open chest and improve upper-back movement.', reps: '2 x 10', tag: 'Posture' },
      { name: 'Hip 90/90 switches', detail: 'Gentle rotation for hips and lower back.', reps: '2 x 8 each side', tag: 'Hips' },
      { name: 'Child pose to cobra wave', detail: 'Smooth spinal movement for the whole back line.', reps: '2 x 8', tag: 'Spine' },
      { name: has('bed') ? 'Bed-supported hamstring fold' : 'Standing hamstring sweep', detail: 'Reduce stiffness from long sitting.', reps: '90 sec', tag: 'Recovery' },
    ],
  };

  const finisherBySpace: Record<Space, Exercise> = {
    tiny: { name: 'Silent cardio burst', detail: 'Fast step jacks or shadow boxing without jumping.', reps: energy === 'gentle' ? '2 min' : '4 min', tag: 'Finish' },
    room: { name: 'Lateral floor shuffle', detail: 'Move side to side and keep the heart rate up.', reps: '3 x 40 sec', tag: 'Finish' },
    walk: { name: '10-step carry circuit', detail: 'Walk forward and back with tight core and strong posture.', reps: '4 laps', tag: 'Finish' },
    outdoor: { name: 'Outdoor power walk intervals', detail: 'Alternate brisk walk and recovery pace.', reps: energy === 'intense' ? '12 min' : '8 min', tag: 'Finish' },
  };

  return [warmup[goal], ...coreMap[goal], finisherBySpace[space]];
}

export function HomeWorkoutPlanner() {
  const [goal, setGoal] = useState<Goal>('full-body');
  const [space, setSpace] = useState<Space>('room');
  const [energy, setEnergy] = useState<Energy>('steady');
  const [duration, setDuration] = useState(20);
  const [equipment, setEquipment] = useState<Equipment[]>(['chair', 'wall']);

  const workoutPlan = buildWorkoutPlan(goal, space, energy, equipment);
  const activeMinutes = Math.max(8, duration - 3);
  const motivationLine =
    goal === 'pilates'
      ? 'Your home becomes a pilates studio with calm, controlled movements.'
      : goal === 'strength'
        ? 'This plan turns simple furniture into practical resistance stations.'
        : goal === 'mobility'
          ? 'This routine is built to undo sitting, stiffness and skipped gym days.'
          : 'This plan covers the whole body so a missed gym day still counts.';

  return (
    <main className="fitflow-shell">
      <section className="fitflow-hero">
        <div className="fitflow-nav">
          <div className="fitflow-brand">
            <span className="fitflow-brand-mark">FF</span>
            <div>
              <p>FitFlow Home</p>
              <span>Fun fitness for real homes</span>
            </div>
          </div>
          <a className="fitflow-nav-link" href="#planner">
            Build my routine
          </a>
        </div>

        <div className="fitflow-hero-grid">
          <div className="fitflow-copy">
            <span className="fitflow-eyebrow">Gym energy without the gym trip</span>
            <h1>Turn your room, sofa, chair or walking space into a playful AI workout coach.</h1>
            <p>
              People skip exercise because the gym takes time, costs money, or home feels too limited. This app proves the opposite:
              if you have privacy and a little space, you can train legs, arms, neck, core, back, abs and posture right now.
            </p>
            <div className="fitflow-cta-row">
              <a className="fitflow-primary-cta" href="#planner">
                Start with what I have
              </a>
              <a className="fitflow-secondary-cta" href="#how-it-works">
                See how it works
              </a>
            </div>
            <div className="fitflow-stat-row">
              <div>
                <strong>0</strong>
                <span>equipment cost to begin</span>
              </div>
              <div>
                <strong>10-30</strong>
                <span>minute routines</span>
              </div>
              <div>
                <strong>1 room</strong>
                <span>is enough to move</span>
              </div>
            </div>
          </div>

          <div className="fitflow-stage" aria-hidden="true">
            <div className="fitflow-stage-orbit fitflow-stage-orbit-one" />
            <div className="fitflow-stage-orbit fitflow-stage-orbit-two" />
            <div className="fitflow-stage-card">
              <div className="fitflow-room">
                <div className="fitflow-sofa" />
                <div className="fitflow-chair" />
                <div className="fitflow-mat" />
                <div className="fitflow-avatar">
                  <span className="fitflow-head" />
                  <span className="fitflow-arm fitflow-arm-left" />
                  <span className="fitflow-arm fitflow-arm-right" />
                  <span className="fitflow-body" />
                  <span className="fitflow-leg fitflow-leg-left" />
                  <span className="fitflow-leg fitflow-leg-right" />
                </div>
              </div>
              <div className="fitflow-stage-copy">
                <p>Live routine idea</p>
                <strong>{motivationLine}</strong>
                <span>Camera coaching can plug in later. For now, the app builds routines from your real home setup.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fitflow-proof-band" id="how-it-works">
        <div>
          <span>Problem solved</span>
          <strong>No time for gym, no equipment at home, no motivation after work.</strong>
        </div>
        <div>
          <span>App response</span>
          <strong>We map furniture, free space and energy level into an actual workout plan.</strong>
        </div>
        <div>
          <span>Future ready</span>
          <strong>Camera form-checking can come next without changing the core product idea.</strong>
        </div>
      </section>

      <section className="fitflow-planner" id="planner">
        <div className="fitflow-section-heading">
          <span className="fitflow-eyebrow">Interactive planner</span>
          <h2>Tell the app what you have. It builds a realistic session instantly.</h2>
        </div>

        <div className="fitflow-planner-grid">
          <aside className="fitflow-controls">
            <div className="fitflow-control-block">
              <p className="fitflow-label">Goal</p>
              <div className="fitflow-option-grid">
                {goalOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`fitflow-choice ${goal === option.id ? 'is-active' : ''}`}
                    onClick={() => setGoal(option.id)}
                  >
                    <strong>{option.title}</strong>
                    <span>{option.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="fitflow-control-block">
              <p className="fitflow-label">Available setup</p>
              <div className="fitflow-chip-grid">
                {equipmentOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`fitflow-chip ${equipment.includes(item.id) ? 'is-active' : ''}`}
                    onClick={() => setEquipment((current) => toggleSelection(current, item.id))}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="fitflow-dual-grid">
              <div className="fitflow-control-block">
                <p className="fitflow-label">Space</p>
                <div className="fitflow-stack">
                  {spaceOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`fitflow-inline-choice ${space === option.id ? 'is-active' : ''}`}
                      onClick={() => setSpace(option.id)}
                    >
                      <strong>{option.title}</strong>
                      <span>{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="fitflow-control-block">
                <p className="fitflow-label">Intensity</p>
                <div className="fitflow-stack">
                  {energyOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`fitflow-inline-choice ${energy === option.id ? 'is-active' : ''}`}
                      onClick={() => setEnergy(option.id)}
                    >
                      <strong>{option.title}</strong>
                      <span>{option.cue}</span>
                    </button>
                  ))}
                </div>

                <label className="fitflow-slider-wrap" htmlFor="duration">
                  <span>
                    Session length
                    <strong>{duration} min</strong>
                  </span>
                  <input id="duration" type="range" min="10" max="30" step="5" value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
                </label>
              </div>
            </div>
          </aside>

          <div className="fitflow-plan-panel">
            <div className="fitflow-plan-summary">
              <div>
                <span className="fitflow-eyebrow">Today&apos;s plan</span>
                <h3>{goalOptions.find((item) => item.id === goal)?.title}</h3>
                <p>{motivationLine}</p>
              </div>
              <div className="fitflow-summary-pills">
                <span>{activeMinutes} active minutes</span>
                <span>{equipment.length || 1} setup inputs</span>
                <span>{spaceOptions.find((item) => item.id === space)?.title}</span>
              </div>
            </div>

            <div className="fitflow-routine-list">
              {workoutPlan.map((exercise, index) => (
                <article key={`${exercise.name}-${index}`} className="fitflow-routine-card">
                  <div className="fitflow-routine-topline">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{exercise.tag}</p>
                  </div>
                  <h4>{exercise.name}</h4>
                  <p>{exercise.detail}</p>
                  <strong>{exercise.reps}</strong>
                </article>
              ))}
            </div>

            <div className="fitflow-plan-footer">
              <div>
                <span className="fitflow-label">Why this works</span>
                <p>
                  The routine mixes available furniture, room size and bodyweight patterns so users stop waiting for a perfect gym setup.
                  It gives them a confident first step at home, in private, or even outdoors.
                </p>
              </div>
              <div>
                <span className="fitflow-label">Next AI layer</span>
                <p>Camera guidance can later score form, count reps and suggest safer progressions in real time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fitflow-feature-grid">
        <article>
          <span>01</span>
          <h3>Built for real excuses</h3>
          <p>The product starts from how people actually talk: "I am home, I am tired, I only have a sofa, let me rest."</p>
        </article>
        <article>
          <span>02</span>
          <h3>Architecture that scales</h3>
          <p>Home setup intake, plan generation, camera coaching later, and outdoor mode all fit into the same product flow.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Free and fun first</h3>
          <p>Short sessions, animated feedback and simple choices lower the barrier so beginners can start immediately.</p>
        </article>
      </section>
    </main>
  );
}
