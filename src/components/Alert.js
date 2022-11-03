function Alert({ alert }) {
  return <small className={`alert alert-${alert.type}`}>{alert.msg}</small>;
}

export default Alert;
