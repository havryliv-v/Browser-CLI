interface ActionButtonProps {
  action: () => void
  btnType: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ action, btnType }) => {
  return (
    <button className="button is-primary is-small" onClick={action}>
      <span className="icon">
        <i className={`fas fa-${btnType}`}></i>
      </span>
    </button>
  )
}

export default ActionButton
