import AddProductForm from "@/components/products/AddProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"


function CreateProductPage() {
  return (
    <>
      <Heading>Nuevo Producto</Heading>

      {/* DE ESTA FORMA RENDERIZAMOS EN EL ERVIDOR DENTRO DE UN CLIENT */}
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    
    </>
  )
}

export default CreateProductPage