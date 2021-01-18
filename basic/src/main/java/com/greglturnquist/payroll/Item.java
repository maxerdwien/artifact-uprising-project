/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.greglturnquist.payroll;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Greg Turnquist
 */
@Entity // <1>
public class Item {

	private @Id @GeneratedValue Long id; // <2>
	private String itemName;
	private int priceInCents;
	private int numberInCart;

	private Item() {}

	public Item(String itemName, int priceInCents) {
		this.itemName = itemName;
		this.priceInCents = priceInCents;
		this.numberInCart = 0;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Item item = (Item) o;
		return Objects.equals(id, item.id) &&
			Objects.equals(itemName, item.itemName) &&
			Objects.equals(priceInCents, item.priceInCents) &&
			Objects.equals(numberInCart, item.numberInCart);
	}

	@Override
	public int hashCode() {

		return Objects.hash(id, itemName, priceInCents, numberInCart);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	// I'm not sure why id2 is necessary. The first one is not presented as a parameter in React.
	public Long getId2() {
		return id;
	}

	//public void setId2(Long id) {
	//	this.id = id;
	//}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getPriceInCents() {
		return priceInCents;
	}

	public void setPriceInCents(int priceInCents) {
		this.priceInCents = priceInCents;
	}
	
	public int getNumberInCart() {
		return numberInCart;
	}

	public void setNumberInCart(int numberInCart) {
		this.numberInCart = numberInCart;
	}

	@Override
	public String toString() {
		return "Item{" +
			"id=" + id +
			", id2='" + id + '\'' +
			", itemName='" + itemName + '\'' +
			", priceInCents='" + priceInCents + '\'' +
			", numberInCart='" + numberInCart + '\'' +
			'}';
	}
}
