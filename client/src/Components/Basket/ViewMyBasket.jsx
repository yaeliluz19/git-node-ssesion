import React, { useState, useEffect, useRef } from 'react';
// import { ProductService } from './service/ProductService';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Checkbox } from 'primereact/checkbox';
import "primeflex/primeflex.css"

import { useCreateNewSweetMutation } from '../../app/sweetsApiSlice'
import { useDeleteSweetMutation } from '../../app/sweetsApiSlice'
import { useUpdateSweetMutation } from '../../app/sweetsApiSlice'
import { useGetAllCartQuery, useUpdateQuantityOfProductMutation } from '../../app/basketSlice'
import './ViewMyBasket.css'
// import { set } from 'mongoose';

export default function ProductsDemo() {

    const [CreateNewSweet, resCreate] = useCreateNewSweetMutation()
    const [DeleteSweet, resDelete] = useDeleteSweetMutation()
    const [UpdateSweet, resUpdate] = useUpdateSweetMutation()
    const [UpdateQuantityOfProduct] = useUpdateQuantityOfProductMutation()
    const { data: cart = [], isSuccess } = useGetAllCartQuery()

    useEffect(() => {
        if (isSuccess)
            console.log(cart);

    }, [isSuccess])

    useEffect(() => {
        if (resCreate.isError) {
            alert(resCreate.error)
        }
        if (resCreate.isSuccess) {
        }
        console.log(resCreate)
    }
        , [resCreate])

    //const [products, setProducts] = useState(sweets);

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    // const [product, setProduct] = useState(null);

    const [checked, setChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [inInventory, setInInventory] = useState(false);
    const [id, setId] = useState(0);
    // const [quantity, setQuantity] = useState(1);

    const [image, setImage] = useState("");


    // const [isCreate, setisCreate] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    const onChangeCheckBox = (checked) => {
        setChecked(checked)
        setInInventory(checked)
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('nis', { style: 'currency', currency: 'ILS' });
    };

    const openNew = () => {
        // setProduct(sweets);
        setSubmitted(false);
        setProductDialog(true);
    };

    const buyBasket = () => {
        // setProduct(sweets);
        setSubmitted(false);
        setProductDialog(true);
    };

    const onClikUpdeteQuentity =(id,quantity)=>{
        console.log(id);
        console.log(quantity);
        UpdateQuantityOfProduct({id,quantity})
    };

    const hideDialog = () => {
        setPrice(0)
        setName("")
        setInInventory(false)
        setId(0)
        setImage("")

        setisEdit(false)
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    // const saveProduct = () => {
    //     setSubmitted(true);

    //     if (name != "" && price != 0) {
    //         if (isEdit) {
    //             console.log("id: " + id);
    //             // UpdateSweet({ id, price, name, quantity, image, inInventory })
    //             setPrice(0)
    //             setName("")
    //             setImage("")
    //             setInInventory(false)
    //             setId(0)
    //             setQuantity(1)
    //             setisEdit(false)
    //         }

    //         else {
    //             CreateNewSweet({ price, name, quantity, image, inInventory })
    //             setPrice(0)
    //             setName("")
    //             setInInventory(false)
    //             setImage("")
    //             setQuantity(1)
    //             setId(0)
    //         }
    //         setProductDialog(false);
    //     }
    // };

    const editProduct = (rowData) => {
        setisEdit(true)
        setProductDialog(true);

        setPrice(rowData.price)
        setName(rowData.name)
        setImage(rowData.image)
        setInInventory(rowData.inInventory)
        setId(rowData._id)
    };

    const confirmDeleteProduct = (id1) => {
        setId(id1)
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        DeleteSweet(id)
        setDeleteProductDialog(false);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        setDeleteProductsDialog(false);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };



    const rightToolbarTemplate = () => {
        return <Button label="רכישת הסל" icon="pi pi-upload" className="p-button-help" onClick={buyBasket} style={{ "backgroundColor": '#ec4899', border: '1px solid #ec4899' }} />;
    };

    const imageBodyTemplate = (rowData) => {
        //../public/images/3.jpg
        return <img src={`images/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '150px', direction: 'rtl' }} />;
        //return <img alt="rowData.image" src={`../public/images/${image}`} height="40" className="mr-2" style={{textAlign:'center', width: '64px'}}></img> 
        //    url('../public/images/3.jpg');
    };
    //,nubvvvv
    const inputN = (rowData) => {
        return (<>
            <InputNumber min={1} className="card flex justify-content-center" value={rowData.quantity} onValueChange={(e) => onClikUpdeteQuentity(rowData._id,e.value)} showButtons buttonLayout="vertical" style={{ width: '8rem' }}
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
        </>)
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inInventory} severity={getSeverity(rowData.inInventory)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        {
        }
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <s style={{ color: '#ffffff' }}> . . . </s>
                {/* //אייקון אפדייט ומחיקה */}
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => { confirmDeleteProduct(rowData._id) }} />
            </React.Fragment>
        );
    };

    const getSeverity = (inInventorys) => {
        switch (inInventorys) {
            case true:
                return 'success';

            case false:
                return 'danger';
        }
    };

    const header = (
        <h1 className="m-0"> הסל שלי </h1>
    );

    // const productDialogFooter = (
    //     <React.Fragment>
    //         <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
    //         <Button label="שמירה" icon="pi pi-check" onClick={saveProduct} />
    //     </React.Fragment>
    // );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="לא" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div >
            <br /><br /><br />
            {/* <img alt="logo" src="../images/logo.png" height="40" className="mr-2" style={{length:'20%',width:'20%'}}></img> */}
            {/* <img alt="logo" src="../images/logo.png" height="40" className="mr-2"></img> */}
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={cart}
                    style={{ opacity: 1 }}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מראה {first} - {last} מתוך {totalRecords} מוצרים" globalFilter={globalFilter} header={header}
                >
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem', direction: 'rtl' }}></Column>
                    <Column field="inventoryStatus" body={statusBodyTemplate} ></Column>
                    <Column field="price" body={priceBodyTemplate} style={{ minWidth: '4rem', direction: 'rtl', textAlign: 'center' }}></Column>
                    <Column field="quantity" body={inputN} style={{ minWidth: '4rem', direction: 'rtl' }} >
                    </Column>
                    <Column field="name" style={{ minWidth: '3rem', direction: 'rtl' }}></Column>
                    <Column field="image" body={imageBodyTemplate} style={{ direction: 'rtl' }}> </Column>
                </DataTable>
            </div>


            <Dialog visible={deleteProductDialog} style={{ width: '32rem', textAlign: 'center' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} /> <br /><br />
                    {(
                        <span>
                            האם אתה בטוח רוצה למחוק את  <b>{name}?</b>
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
