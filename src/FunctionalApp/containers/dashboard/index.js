import React, { useEffect, useState } from 'react';
import DashboardService from './service/dashboardService';
import './dashboard.css';
import Logo from './icons/logo';
import TodoListingCard from './components/todoListingCard';
import CreateNewModal from './components/createNewModal';


export default function Dashboard() {
    const [account, setAccount] = useState({});
    const [todoListing, setTodoListing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateNewModalOpen, setIsCreateNewModalOpen] = useState(false);

    const saveToDo = async (toDoData) => {
        setIsLoading(true);
        DashboardService.saveToDo(toDoData);
        loadToDoListingData();
    }

    const toggleCreateNewModal = () => {
        setIsCreateNewModalOpen(!isCreateNewModalOpen);
    }

    const loadToDoListingData = async () => {
        setIsLoading(true);
        var accountData = await DashboardService.getAccount();
        if (accountData == null) {
            // add logged out check here
        }
        setAccount(accountData);
        var todoListingData = await DashboardService.getToDoListing(accountData.id);
        setTodoListing(todoListingData);
        setIsLoading(false);
    }

    const markCompleteTodo = async (id) => {
        setIsLoading(true);
        await DashboardService.markCompleteTodo(id);
        await loadToDoListingData();
        setIsLoading(false);
    }

    const deleteToDo = async (id) => {
        setIsLoading(true);
        await DashboardService.deleteToDo(id);
        await loadToDoListingData();
        setIsLoading(false);
    }


    //Works as componentDidMount
    useEffect(() => {
        loadToDoListingData()
    }, []);


    if (isLoading) {
        return (
            <div className='loader' />
        )
    }
    else {
        return (
            <div className='dashboard'>
                {isCreateNewModalOpen &&
                    <CreateNewModal
                        toggleCreateNewModal={toggleCreateNewModal}
                        saveToDo={saveToDo}
                    />}
                <div className='header'>
                    <Logo className='logo' />
                    <div className='profile-name'>
                        {account.name}
                    </div>
                </div>
                <div className='to-do'>
                    <div className='subheader'>
                        <button className='create-new' onClick={toggleCreateNewModal}> + Create New</button>
                    </div>
                    <div className='listing'>
                        {todoListing.map(el => {
                            return <TodoListingCard
                                data={el}
                                key={el.id}
                                deleteToDo={deleteToDo}
                                markCompleteTodo={markCompleteTodo}
                            />
                        })}
                    </div>
                </div>
            </div>
        )
    }
}