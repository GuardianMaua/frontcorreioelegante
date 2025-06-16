function TelaCodigo() {

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div  style={{ backgroundColor: '#5C0E5D' }} className=" p-6 rounded-lg shadow-lg w-80 flex flex-col items-center space-y-4">

        <img src={"cifraDoAmor.jpg"} alt="Logo da empresa" />
       
        <input 
          
          placeholder="Código"
          className="bg-white w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />

       
        <input
          
          placeholder="Chave"
          className="bg-white w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  )
}

export default TelaCodigo
