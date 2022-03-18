import React from "react"

export const SearchPanel = ({param, users, setParam}) => {
    
    
    // You can also define setParam function here and call it back at onChange
    return <form>
        <div>
            {/*Call back function: funB as funA's parameter
               setParam 
               evt = event? */}
            {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                {/*Show all the users in the pull-down list*/}
                <option value={""}>Manager</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}