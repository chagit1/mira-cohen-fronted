import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import { AddStudent } from "./AddStudent.component";

export const AllStudent = () => {
    const handleAddStudent = () => {
        debugger
        Swal.fire({
            title: 'הוספת תלמיד',
            html: '<div id="add-student"></div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: () => {
                const container = document.getElementById('add-student');
                if (container) {
                    ReactDOM.render(
                        <AddStudent></AddStudent>,
                        //     <ProviderWrapper userId={userId} />,
                        container
                    );
                }
            },
        })
    }

    return <>
        <>
        
            <button className="add-Student-button" onClick={handleAddStudent}>
                +
                <span className='add' style={{ fontSize: 15, color: '#636363', marginLeft: '5px' }}>הוספת תלמיד</span>
            </button>
        </>
    </>
} 