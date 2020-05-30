export default function handleDragTab(e, drag, tab) {
  e.preventDefault();
  const x = e.pageX; const y = e.pageY;
  setTimeout(() => { drag({ tab, x, y }); }, 200);
}
