package com.drp21.backend.repository;

import com.drp21.backend.model.ListingPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListingPhotoRepository extends JpaRepository<ListingPhoto, Long> {
}