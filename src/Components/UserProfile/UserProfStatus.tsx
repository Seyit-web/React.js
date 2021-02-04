
import React from 'react'
import uProf from './UserProfile.module.css'



type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

type StateType = {
    status: string
    editMode: boolean 
}

class UserProfStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode() {
        this.setState({ editMode: true }); //setState является асинхронным, значения до и после покажут false
    }

    deActivateEditMode() {
        this.setState({ editMode: false }); //setState является асинхронным, значения до и после покажут false
        this.props.updateUserStatus(this.state.status);
    }
    
    onStatusChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>

                { !this.state.editMode && 
                <div>
                    <span onClick={ this.activateEditMode.bind(this) }>{this.props.status || "Status"}</span>
                </div> 
                }

                { this.state.editMode && 
                <div>
                    <input className={uProf.forStatus} onChange={ this.onStatusChange.bind(this) } autoFocus={true} onBlur={ this.deActivateEditMode.bind(this) } value={this.state.status} />
                </div> 
                }

                {/* { 
                    this.state.editMode 
                    ? <div><input onChange={ this.onStatusChange.bind(this) } autoFocus={true} onBlur={ this.deActivateEditMode.bind(this) } value={this.state.status} /></div> 
                    : <div><span onClick={ this.activateEditMode.bind(this) }>{this.props.status || "Status"}</span></div> 
                }  */}

            </div>
        )
    }
}

export default UserProfStatus;