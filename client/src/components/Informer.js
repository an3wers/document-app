function Informer({text}) {
    return (
        <div className="alert alert-success" role="alert">
        {text || 'A simple success alert—check it out!'}
        </div>
    )
}

export default Informer;