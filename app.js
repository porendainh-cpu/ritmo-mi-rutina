const form=document.querySelector('#routine-form');
const results=document.querySelector('#results');
const dayTemplates={
  2:[['Día A · Cuerpo completo',['Sentadilla a silla · 2 × 8','Empuje en pared · 2 × 8','Puente de glúteo · 2 × 10','Remo con banda ligera · 2 × 8']],['Día B · Cuerpo completo',['Bisagra de cadera sin peso · 2 × 8','Press de hombro ligero · 2 × 8','Bird-dog · 2 × 6 por lado','Caminata cómoda · 10 min']]],
  3:[['Día A · Fuerza suave',['Sentadilla a silla · 2 × 8','Empuje en pared · 2 × 8','Puente de glúteo · 2 × 10']],['Día B · Movimiento',['Caminata cómoda · 15–20 min','Movilidad de hombros · 2 × 8','Bird-dog · 2 × 6 por lado']],['Día C · Cuerpo completo',['Bisagra de cadera sin peso · 2 × 8','Remo con banda ligera · 2 × 8','Elevación de talones · 2 × 10']]],
  4:[['Día A · Cuerpo completo',['Sentadilla a silla · 2 × 8','Empuje en pared · 2 × 8','Remo con banda ligera · 2 × 8']],['Día B · Cardio cómodo',['Caminata o bici suave · 15–20 min','Movilidad de cadera · 2 × 8']],['Día C · Cuerpo completo',['Bisagra de cadera sin peso · 2 × 8','Puente de glúteo · 2 × 10','Press de hombro ligero · 2 × 8']],['Día D · Recuperación activa',['Caminata tranquila · 15 min','Estiramiento cómodo · 5 min']]]
};
function escapeText(value){const node=document.createElement('span');node.textContent=value;return node.innerHTML}
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form),age=Number(data.get('age')),days=data.get('days'),level=data.get('level'),goal=data.get('goal');
  if(data.get('health')){
    results.innerHTML='<div class="result-head"><div><p class="eyebrow">02 — SIGUIENTE PASO</p><h2 class="result-title">Primero, una orientación profesional</h2></div><span class="tag">Cuida tu cuerpo</span></div><p class="result-summary">Como indicaste que necesitas adaptar el ejercicio, esta app no generará una rutina. Habla con un profesional de salud o de actividad física que conozca tu situación; puede ayudarte a elegir movimientos y límites adecuados.</p><p class="result-foot">Mientras tanto, no empieces ejercicios que provoquen dolor ni cambies una indicación médica. Si ya tienes autorización para moverte, sigue las instrucciones que te dieron.</p>';
  }else{
    const goalText={fuerza:'ganar fuerza y confianza',energia:'mejorar condición y energía',habito:'crear el hábito de entrenar',movilidad:'moverte con más movilidad'}[goal];
    const levelText={beginner:'propuesta inicial y de baja exigencia',regular:'propuesta moderada y ajustable',experienced:'propuesta general; mantén una intensidad cómoda'}[level];
    const sessions=dayTemplates[days].map(([title,items])=>`<article class="day-card"><h3>${title}</h3><ul>${items.map(item=>`<li>${escapeText(item)}</li>`).join('')}</ul></article>`).join('');
    results.innerHTML=`<div class="result-head"><div><p class="eyebrow">02 — TU PROPUESTA GENERAL</p><h2 class="result-title">Empieza con constancia, no con prisa.</h2></div><span class="tag">${days} días · ${level==='beginner'?'inicio amable':'ajustable'}</span></div><p class="result-summary">Tomando en cuenta tu objetivo de <strong>${goalText}</strong>, tu experiencia y los días disponibles, aquí tienes una ${levelText}. La edad, el peso y la estatura no determinan por sí solos qué rutina es segura ni se usan para calificar tu cuerpo.</p><div class="routine-grid">${sessions}</div><p class="result-foot"><strong>Cómo usarla:</strong> comienza con 5–10 minutos de calentamiento suave, descansa entre series y termina cada movimiento sintiendo que podrías hacer un poco más. Si algo duele, detente. Deja al menos un día de recuperación entre sesiones de fuerza. ${age<18?'Por ser menor de 18 años, revísala con un adulto responsable y busca orientación antes de entrenar con cargas.':''}</p>`;
  }
  results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});
});
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
