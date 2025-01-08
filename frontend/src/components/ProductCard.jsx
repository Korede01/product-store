import {
	Box,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	VStack
} from "@chakra-ui/react";
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from "../components/ui/dialog";
import { useDisclosure } from '@chakra-ui/react';
import { Button } from "../components/ui/button";
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const ProductCard = ({product}) => {

	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { open, onOpen, onClose } = useDisclosure();
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const { deleteProduct, updateProduct } = useProductStore();

	useEffect(() => {
		console.log("Dialog state changed:", open )
	})

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (success) {
			toaster.create({
			title: "Success",
			description: message,
			status: "success",
			duration: 5000,
			type: "success",
			isClosable: true,
			});
		} else {
			toaster.create({
			title: "Error",
			description: message,
			status: "error",
			duration: 5000,
			type: "error",
			isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (success) {
			toaster.create({
			title: "Success",
			description: "Product updated successfully",
			status: "success",
			duration: 5000,
			type: "success",
			isClosable: true,
			});
		} else {
			toaster.create({
			title: "Error",
			description: message,
			status: "error",
			duration: 5000,
			type: "error",
			isClosable: true,
			});
		}
	};


	return (
		<Box
			shadow={"lg"}
			rounded={"lg"}
			overflow={"hidden"}
			transition={"all 0.3s"}
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton 
						aria-label="Edit Product" 
						onClick={ () => {
							console.log("Edit button clicked");
							onOpen();
							console.log("Dialog state after open:", open)
						}}
						colorPalette='blue'>
							<MdEdit />
					</IconButton>
					
					<IconButton 
						aria-label="Delete Product" 
						onClick={() => handleDeleteProduct(product._id)} 
						colorPalette='red'>
							<MdDelete />
					</IconButton>
					
				</HStack>
			</Box>

			<DialogRoot open={open} onClose={onClose} placement={'center'}>
			
			<DialogContent>
				<DialogHeader>
				<DialogTitle>Dialog Title</DialogTitle>
				</DialogHeader>
				<DialogBody>
				<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
				</DialogBody>
				<DialogFooter>
					<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
					</Button>
					<Button variant='ghost' onClick={onClose}>
							Cancel
					</Button>
				</DialogFooter>
				<DialogCloseTrigger />
			</DialogContent>
			</DialogRoot>

		</Box>
	)
}

export default ProductCard;