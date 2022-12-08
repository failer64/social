import React from 'react'

class Status extends React.Component {
    state = {
        editMode: false,
        status: this.props.userStatus,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                status: this.props.userStatus
            });
        }
    }

    render() {
        return (
            <>
                {this.state.editMode
                    ? <div><input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onStatusChange}
                                  value={this.state.status}/></div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.userStatus || '---'}</span>
                    </div>
                }
            </>
        )
    }
}

export default Status