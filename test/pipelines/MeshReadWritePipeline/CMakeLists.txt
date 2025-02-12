cmake_minimum_required(VERSION 3.10)
project(MeshReadWriteTest)

set(CMAKE_CXX_STANDARD 17)

set(io_components)
if(NOT EMSCRIPTEN)
  set(io_components ITKMeshIO)
endif()
find_package(ITK REQUIRED
  COMPONENTS
    ${io_components}
    WebAssemblyInterface
  )
include(${ITK_USE_FILE})

add_executable(MeshReadWriteTest MeshReadWriteTest.cxx)
target_link_libraries(MeshReadWriteTest PUBLIC ${ITK_LIBRARIES})

enable_testing()
add_test(NAME MeshReadWriteTest
  COMMAND MeshReadWriteTest ${CMAKE_CURRENT_SOURCE_DIR}/cow.vtk
  ${CMAKE_CURRENT_BINARY_DIR}/cow.written.vtk
  )

add_test(NAME MeshReadWriteWASMTest
  COMMAND MeshReadWriteTest ${CMAKE_CURRENT_SOURCE_DIR}/cow.vtk
  ${CMAKE_CURRENT_BINARY_DIR}/cow.iwm
  )

add_test(NAME MeshReadWriteWASMCBORTest
  COMMAND MeshReadWriteTest ${CMAKE_CURRENT_SOURCE_DIR}/cow.vtk
  ${CMAKE_CURRENT_BINARY_DIR}/cow.iwm.cbor
  )

add_test(NAME MeshReadWriteWASMInputTest
  COMMAND MeshReadWriteTest ${CMAKE_CURRENT_BINARY_DIR}/cow.iwm
  ${CMAKE_CURRENT_BINARY_DIR}/cow.out.iwm
  )
