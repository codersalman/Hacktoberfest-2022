#include<iostream>
using namespace std;

int* Reverse_Array(int* arr, int size)
{
	int* arr2 = new int[size];
	for (int i = 0, j = size - 1; i < size; i++, j--)
	{
		arr2[i] = arr[j];
	}
	return arr2;
}
void Display(int* arr, const int size)
{
	cout << "\n   -----------------------------" << endl;
	cout << "\tReversed Array is: " << endl;
	cout << "   -----------------------------" << endl;
	for (int i = 0; i < size; i++)
	{
		cout << arr[i] << " ";
	}
}
int main()
{
	int size;
	cout << "Enter the size of an array: ";
	cin >> size;
	int* arr=new int[size];
	cout << "Start entering the elements of Array" << endl;
	for (int i = 0; i < size; i++)
	{
		cin >> arr[i];
	}
	cout << "   -----------------------------" << endl;
	cout << "\tOrignal Array is: " << endl;
	cout << "   -----------------------------" << endl;
	for (int i = 0; i < size; i++)
	{
		cout << arr[i] << " ";
	}
	cout << endl;
	int* aptr = Reverse_Array(arr, size);
	Display(aptr, size);
	cout << endl;
	delete[] aptr;
	delete[]arr;
	arr = nullptr;
	aptr = nullptr;
}