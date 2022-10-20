#include<iostream>
using namespace std;
int main()
{
	int rows,sum=0;
	cout << "Enter the number Of Rows:" << endl;
	cin >> rows;
	int cols;
	cout << "Enter the number Of Columns:" << endl;
	cin >> cols;
	int** arr = new int* [rows];
	for (int i = 0; i < rows; i++)
	{
		arr[i] = new int[cols];
	}
	cout << "Enter the Elements of First Array:" << endl;
	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
		{
			cin >> arr[i][j];
		}
	}
	cout << "Print the 2D Array:" <<endl;
	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
		{
			cout<<arr[i][j]<<" ";
		}
		cout << endl;
	}
	cout << "Second 2D Array" << endl;
	int** arr2 = new int* [rows];
	for (int i = 0; i < rows; i++)
	{
		arr2[i] = new int[cols];
	}
	cout << "Enter the Elements of Second Array:" << endl;
	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
		{
			cin >> arr2[i][j];
		}
	}
	cout << "Print the 2D Array:" << endl;
	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
		{
			cout << arr2[i][j] << " ";
		}
		cout << endl;
	}
	cout << "Multiplication Of 2D Array:" << endl;
	for (int i = 0; i < rows; i++)
	{
		for (int j = 0; j < cols; j++)
		{
			sum = 0;
			for (int k = 0; k < cols; k++)
			{
				sum = sum + arr[i][k] * arr2[k][j];
			}
			cout << sum << " ";
		}
		cout << endl;
	}
	cout << "Deallocate the Array:" << endl;
	for (int i = 0; i < rows; i++)
	{
		delete[] arr;
		arr = NULL;
	}
	for (int i = 0; i < rows; i++)
	{
		delete[] arr2;
		arr2 = NULL;
	}

	
}