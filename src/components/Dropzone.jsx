import { useDrop } from 'react-dnd'

const Dropzone = (props) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: () => ({ destination: props.origin }),
    canDrop: () => { return true },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const dropzoneStyle = {
    backgroundColor: isOver ? 'green' : 'lightgreen',
    border: '1px solid black',
    width: '100px',
    height: '150px'
  }

  return (
    <div ref={drop} role={'dropzone'} style={dropzoneStyle}>
      {/* {canDrop ? 'Release' : 'Drag here'} */}
      {props.children}
    </div>
  )
}

export default Dropzone