#!/usr/bin/env python3

"""
helper functiom
"""
import csv
import math
from typing import Tuple, List, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    return a tuple of size two containing
    a start index and an end index corresponding to the range of indexes to
    return in a list for those particular pagination parameters.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """indexed data set"""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Retrieves data from a given index with a specified size.
        """
        indexed_data = self.indexed_dataset()
        assert index is not None and index >= 0
        assert index <= max(indexed_data.keys())
        data = []
        count = 0
        next_index = None
        start = index if index else 0
        for i, item in indexed_data.items():
            if i >= start and count < page_size:
                data.append(item)
                count += 1
                continue
            if count == page_size:
                next_index = i
                break
        return {
            "index": index,
            "next_index": next_index,
            "page_size": len(data),
            "data": data,
        }
