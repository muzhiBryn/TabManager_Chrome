export default function handleDragTab(e, drag, tab, isActive) {
  e.preventDefault();
  const x = e.pageX; const y = e.pageY;
  setTimeout(() => { drag({ tab, x, y }); }, (isActive ? 0 : 200));
}
