#include<iostream>
using namespace std;

// ----Prototype of reciever founction of 2D array---


void setData(int** ,int ,int);



int main()
{
//	------allocation of 2D array------
	
	int r , c;
	cout<<"Enter the no of rows of a matrix: ";
	cin>>r;
	cout<<"Enter the no of columns of a matrix: ";
	cin>>c;
	
	int ** matrix=new int*[r];
	
	for(int i=0 ; i<r ; i++)
	{
		matrix[i]=new int [c];
	}
	
//	------Passing 2D array to function----

	setData(matrix , r , c);
	
//  ------Deallocation of 2D array------

	for(int i=0 ; i<r ; i++)
	{
		delete[] matrix[i];
		matrix[i] = nullptr;
	}
	
	delete [] matrix;
	matrix = nullptr;
	
	return 0;
}


//	------recieving 2D array by a function-----

void setData(int** matrix , int r ,int c)
{
	for(int i=0 ; i<r ; i++)
	{
		for(int j=0 ; j<c ; j++)
		{
			cin>>matrix[i][j];
		}
	}
}